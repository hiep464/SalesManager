import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Numeral from 'react-numeral';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { apiBaseUrl } from '../../constant/constant';
import app from '../../firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CloseIcon from '@mui/icons-material/Close';
import { getCookie } from '../../utils/api';

const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'images/' + file.name);

    try {
        // Tải ảnh lên Firebase Storage
        await uploadBytes(storageRef, file);

        // Lấy URL tải xuống của ảnh
        const downloadURL = await getDownloadURL(storageRef);

        // Trả về URL ảnh để sử dụng
        return downloadURL;
    } catch (error) {
        // Xử lý lỗi tải ảnh
        console.log('Lỗi tải ảnh:', error);
        return null;
    }
};

function extractArrayProperties(arr, properties) {
    return arr.map((obj) => {
        return properties.reduce((result, property) => {
            if (obj.hasOwnProperty(property)) {
                result[property] = obj[property];
            }
            return result;
        }, {});
    });
}

function isSubset(subsetObj, parentObj) {
    for (let key in subsetObj) {
        if (!parentObj.hasOwnProperty(key) || subsetObj[key] !== parentObj[key]) {
            return false;
        }
    }

    return true;
}

function findCommonElements(arr1, arr2) {
    const commonElements = [];

    for (let element of arr1) {
        // const elementString = JSON.stringify(element);

        if (arr2.some((item) => isSubset(element, item))) {
            commonElements.push(element);
        }
    }

    return commonElements;
}

function filterUniqueElements(arr) {
    const uniqueSet = new Set(arr.map((item) => JSON.stringify(item)));
    return Array.from(uniqueSet, (item) => JSON.parse(item));
}

function checkEmptyAttributesArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].size === '' || array[i].color === '') {
            return true;
        }
    }
}

function ProductDetails() {
    let { code } = useParams();
    const navigate = useNavigate();

    const [attributes, setAttributes] = useState([]);
    const [addAttribute, setAddAttribute] = useState([]);
    const [product, setProduct] = useState({});
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState('');
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorDetails, setErrorDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [deleteElement, setDeleteElement] = useState(0);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [refesh, setRefesh] = useState(0);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(false);
    const inputFileRef = useRef(null);

    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    const handleClickSnackBar = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackBar(false);
    };

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/product/${code}/attribute`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                console.log('attribute: ', response.data);
                setAttributes(response.data);
            });
        axios
            .get(`${apiBaseUrl}/inventory/products/${code}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                // console.log(response.data);
                setProduct(response.data);
            });
        // ${apiBaseUrl}/categories
    }, [refesh]);

    useEffect(() => {
        axios
            .get(`${apiBaseUrl}/inventory/categories`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then((response) => {
                // console.log(response.data);
                setCategories(response.data);
            });
    }, []);

    useEffect(() => {
        if (product?.categoryCode) {
            axios
                .get(`${apiBaseUrl}/inventory/categories/${product?.categoryCode}`, {
                    headers: {
                        // token: Cookies.get('token'),
                        Authorization: getCookie('Authorization'),
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                    setCategoryName(response.data?.name);
                });
        }
    }, [product]);

    const addElement = (newElement) => {
        setAddAttribute((prevArray) => [...prevArray, newElement]);
    };

    const handleDelete = (index) => {
        if (index > -1) {
            const newArray = [...addAttribute]; // Tạo một bản sao của mảng gốc
            newArray.splice(index, 1); // Xóa phần tử tại chỉ mục index
            setAddAttribute(newArray); // Cập nhật state với mảng mới đã xóa phần tử
        }
    };

    const handleChangeSize = (event, index) => {
        const { value } = event.target;
        setAddAttribute((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index].size = value;
            return updatedValues;
        });
    };

    const handleChangeColor = (event, index) => {
        const { value } = event.target;
        setAddAttribute((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index].color = value;
            return updatedValues;
        });
    };

    const handleChangePrice = (event, index) => {
        const { value } = event.target;
        setAddAttribute((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index].price = parseFloat(value.replace(/,/g, ''));
            return updatedValues;
        });
    };

    const handleChangeOriginalCost = (event, index) => {
        const { value } = event.target;
        setAddAttribute((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index].originalCost = parseFloat(value.replace(/,/g, ''));
            return updatedValues;
        });
    };

    const handleAddAttribute = () => {
        let newAttribute = { productCode: code, size: '', color: '', price: 0, originalCost: 0 };
        addElement(newAttribute);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        const arr = extractArrayProperties(addAttribute, ['size', 'color']);
        if (checkEmptyAttributesArray(arr)) {
            setError(true);
            setErrorMessage('Size và color không được để trống');
        } else {
            const result = findCommonElements(arr, attributes);
            if (result.length > 0) {
                setError(true);
                const resultFilter = filterUniqueElements(result);
                setErrorMessage('');
                setErrorDetails(resultFilter);
            } else {
                if (addAttribute.length > 0) {
                    axios
                        .post(`${apiBaseUrl}/inventory/product/attribute/add_list`, addAttribute, {
                            headers: {
                                // token: Cookies.get('token'),
                                Authorization: getCookie('Authorization'),
                            },
                        })
                        .then(() => {
                            console.log('sucess');
                        });
                }

                if (selectedImage) {
                    const url = await uploadImage(selectedImage);
                    product.image = url;
                }
                console.log(attributes);

                axios
                    .put(`${apiBaseUrl}/inventory/product/update`, product, {
                        headers: {
                            // token: Cookies.get('token'),
                            Authorization: getCookie('Authorization'),
                        },
                    })
                    .then(() => {
                        console.log('update product sucess');
                    });
                axios
                    .put(`${apiBaseUrl}/inventory/product/attribute/update_list`, attributes, {
                        headers: {
                            // token: Cookies.get('token'),
                            Authorization: getCookie('Authorization'),
                        },
                    })
                    .then(() => {
                        console.log('update list sucess');
                    });
                setAddAttribute([]);
                setUpdate(false);
                setMessage('Cập nhật thành công');
                handleClickSnackBar();
                setRefesh(refesh + 1);
                setImageURL(null);
                // inputFileRef.current.value = null;
                setSelectedImage(null);
            }
        }
    };

    const handleDeleteAttribute = () => {
        axios
            .delete(`${apiBaseUrl}/inventory/product/attribute/${deleteElement}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then(() => {
                setOpen(false);
                const updatedAttribute = attributes.filter((item) => item.id !== deleteElement);
                setAttributes(updatedAttribute);
                setMessage('Xóa thành công');
                handleClickSnackBar();
            });
    };

    function handleImageUpload(event) {
        const file = event.target.files[0];
        console.log(file);
        setSelectedImage(file);
        const imageURLTemp = URL.createObjectURL(file);
        setImageURL(imageURLTemp);
    }

    function deleteImage() {
        if (imageURL) {
            URL.revokeObjectURL(imageURL);
            setImageURL(null);
            // inputFileRef.current.value = null;
            setSelectedImage(null);
        }
    }

    const handleDeleteProduct = () => {
        axios
            .delete(`${apiBaseUrl}/inventory/products/delete/${code}`, {
                headers: {
                    // token: Cookies.get('token'),
                    Authorization: getCookie('Authorization'),
                },
            })
            .then(() => {
                setMessage('Xóa thành công');
                handleClickSnackBar();
                setDeleteProduct(false);
                alert('Xóa thành công');
                navigate('/inventory/product');
            });
    };

    const handleOpenFileDialog = () => {
        inputFileRef.current.click();
    };

    return (
        <div style={{ width: 'calc(82vw - 44px)' }}>
            {/* product info */}
            {update ? (
                <TextField
                    sx={{ width: '20%' }}
                    size="small"
                    value={product?.name}
                    variant="outlined"
                    onChange={(e) => {
                        setProduct((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }));
                    }}
                />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{product?.name}</h2>
                    {/* <Box>
                        <Button variant="contained" disableElevation>
                            Đặt hàng
                        </Button>
                    </Box> */}
                </div>
            )}
            <Box>
                <div style={{ padding: '10px 0' }}>Thông tin sản phẩm</div>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        width: '100%',
                        display: 'flex',
                        marginBottom: '23px',
                        borderRadius: '6px',
                    }}
                >
                    <List sx={{ width: '65%' }}>
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary="Loại Sản phẩm :" />
                                {update ? (
                                    <Select
                                        size="small"
                                        sx={{ width: '50%' }}
                                        value={product?.categoryCode}
                                        onChange={(e) => {
                                            setProduct((prev) => ({
                                                ...prev,
                                                categoryCode: e.target.value,
                                            }));
                                        }}
                                    >
                                        {categories?.map((item) => (
                                            <MenuItem key={item?.code} value={item?.code}>
                                                {item?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                ) : (
                                    categoryName
                                )}
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary="Thương hiệu :" />
                                {update ? (
                                    <TextField
                                        sx={{ width: '50%' }}
                                        type="text"
                                        size="small"
                                        value={product?.brand}
                                        variant="outlined"
                                        onChange={(e) => {
                                            setProduct((prev) => ({
                                                ...prev,
                                                brand: e.target.value,
                                            }));
                                        }}
                                    />
                                ) : (
                                    product?.brand
                                )}
                            </Box>
                        </ListItem>
                        {update ? (
                            ''
                        ) : (
                            <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Ngày tạo :" />
                                    {product?.createAt}
                                </Box>
                                <Box sx={{ width: '48%', display: 'flex', alignItems: 'center' }}>
                                    <ListItemText primary="Ngày cập nhật cuối :" />
                                    {product?.updateAt}
                                </Box>
                            </ListItem>
                        )}
                    </List>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '35%',
                        }}
                    >
                        {product?.image ? (
                            <div style={{ position: 'relative' }}>
                                <img src={product.image} alt="image" style={{ width: '100px', height: '100px' }} />
                                {update ? (
                                    <CloseIcon
                                        sx={{
                                            position: 'absolute',
                                            top: '0',
                                            right: '1px',
                                            width: '18px',
                                            height: '18px',
                                            color: 'red',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            setProduct((prev) => ({
                                                ...prev,
                                                image: null,
                                            }));
                                        }}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        ) : (
                            <>
                                {update ? (
                                    imageURL ? (
                                        <div style={{ position: 'relative', marginLeft: '10px' }}>
                                            <img
                                                style={{ width: '100px', height: '100px', borderRadius: '4px' }}
                                                src={imageURL}
                                                alt="Uploaded"
                                            />
                                            {/* <button onClick={deleteImage}>Delete Image</button> */}
                                            <CloseIcon
                                                sx={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    right: '1px',
                                                    width: '14px',
                                                    height: '14px',
                                                    color: 'red',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={deleteImage}
                                            />
                                        </div>
                                    ) : (
                                        <Button variant="text" onClick={handleOpenFileDialog} startIcon={<AddIcon />}>
                                            Tải ảnh lên
                                        </Button>
                                    )
                                ) : (
                                    <>
                                        <AddPhotoAlternateIcon sx={{ width: '60px', height: '60px', margin: '20px' }} />
                                        chưa có hình ảnh
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    ref={inputFileRef}
                                    onChange={handleImageUpload}
                                ></input>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box>
                <div style={{ padding: '10px 0' }}>
                    <span>Thuộc tính sản phẩm</span>
                    {update ? (
                        <Button
                            onClick={handleAddAttribute}
                            variant="contained"
                            sx={{ margin: '10px', float: 'right' }}
                        >
                            Thêm thuộc tính
                        </Button>
                    ) : (
                        ''
                    )}
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell align="left">Ảnh</TableCell> */}
                                <TableCell align="left">
                                    Kích cỡ
                                    {update ? (
                                        <Tooltip
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                            title="Kích cỡ hợp lệ gồm : M, L, XL"
                                            placement="top"
                                        >
                                            <InfoRoundedIcon
                                                sx={{ width: '16px', height: '16px', color: 'primary.main' }}
                                            />
                                        </Tooltip>
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    Màu
                                    {update ? (
                                        <Tooltip
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                            }}
                                            title="Màu hợp lệ gồm : đỏ, xanh, vàng"
                                            placement="top"
                                        >
                                            <InfoRoundedIcon
                                                sx={{ width: '16px', height: '16px', color: 'primary.main' }}
                                            />
                                        </Tooltip>
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                                <TableCell align="left">Giá bán</TableCell>
                                <TableCell align="left">Giá nhập</TableCell>
                                {update ? '' : <TableCell align="left">Số lượng</TableCell>}
                                {!update ? <TableCell align="left">Ngày tạo</TableCell> : ''}
                                {update ? <TableCell /> : ''}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attributes.map((row, index) => {
                                if (row?.status !== `delete`)
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell sx={{ width: '18%' }} component="th" scope="row">
                                                {row.size}
                                            </TableCell>
                                            <TableCell sx={{ width: '18%' }} align="left">
                                                {row.color}
                                            </TableCell>
                                            <TableCell align="left">
                                                {update ? (
                                                    <NumericFormat
                                                        thousandSeparator={true}
                                                        prefix={''}
                                                        customInput={TextField}
                                                        type="text"
                                                        // Các thuộc tính khác của TextField
                                                        // defaultValue={row.quantity}
                                                        value={row?.price}
                                                        sx={{ width: '50%' }}
                                                        size="small"
                                                        variant="standard"
                                                        onChange={(e) => {
                                                            setAttributes((prevItems) =>
                                                                prevItems.map((item) =>
                                                                    item.id === row.id
                                                                        ? {
                                                                              ...item,
                                                                              price: parseFloat(
                                                                                  e.target.value.replace(/,/g, ''),
                                                                              ),
                                                                          }
                                                                        : item,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <Numeral value={row?.price} format={'0,0'} />
                                                )}
                                            </TableCell>
                                            <TableCell align="left">
                                                {update ? (
                                                    <NumericFormat
                                                        thousandSeparator={true}
                                                        prefix={''}
                                                        customInput={TextField}
                                                        type="text"
                                                        // Các thuộc tính khác của TextField
                                                        value={row?.originalCost}
                                                        sx={{ width: '50%' }}
                                                        size="small"
                                                        variant="standard"
                                                        onChange={(e) => {
                                                            setAttributes((prevItems) =>
                                                                prevItems.map((item) =>
                                                                    item.id === row.id
                                                                        ? {
                                                                              ...item,
                                                                              originalCost: parseFloat(
                                                                                  e.target.value.replace(/,/g, ''),
                                                                              ),
                                                                          }
                                                                        : item,
                                                                ),
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <Numeral value={row?.originalCost} format={'0,0'} />
                                                )}
                                            </TableCell>
                                            {update ? (
                                                ''
                                            ) : (
                                                <TableCell align="left">
                                                    {update ? (
                                                        <NumericFormat
                                                            thousandSeparator={true}
                                                            prefix={''}
                                                            customInput={TextField}
                                                            type="text"
                                                            // Các thuộc tính khác của TextField
                                                            value={row?.quantity}
                                                            sx={{ width: '50%' }}
                                                            size="small"
                                                            variant="standard"
                                                            onChange={(e) => {
                                                                setAttributes((prevItems) =>
                                                                    prevItems.map((item) =>
                                                                        item.id === row.id
                                                                            ? {
                                                                                  ...item,
                                                                                  quantity: parseFloat(
                                                                                      e.target.value.replace(/,/g, ''),
                                                                                  ),
                                                                              }
                                                                            : item,
                                                                    ),
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        row?.quantity
                                                    )}
                                                </TableCell>
                                            )}
                                            {!update ? (
                                                <TableCell sx={{ width: '15%' }} align="left">
                                                    {row.createAt}
                                                </TableCell>
                                            ) : (
                                                ''
                                            )}
                                            {update ? (
                                                <TableCell align="center">
                                                    <DeleteIcon
                                                        onClick={() => {
                                                            handleClickOpen();
                                                            setDeleteElement(row?.id);
                                                        }}
                                                    />
                                                </TableCell>
                                            ) : (
                                                ''
                                            )}
                                        </TableRow>
                                    );
                            })}
                            {update
                                ? addAttribute?.map((row, index) => {
                                      return (
                                          <TableRow
                                              key={index}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                              <TableCell sx={{ width: '18%' }} component="th" scope="row">
                                                  <TextField
                                                      onChange={(e) => handleChangeSize(e, index)}
                                                      value={row?.size}
                                                      sx={{ width: '60%' }}
                                                      size="small"
                                                      variant="outlined"
                                                  />
                                              </TableCell>
                                              <TableCell sx={{ width: '18%' }} component="th" scope="row">
                                                  <TextField
                                                      onChange={(e) => handleChangeColor(e, index)}
                                                      value={row?.color}
                                                      sx={{ width: '60%' }}
                                                      size="small"
                                                      variant="outlined"
                                                  />
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  <NumericFormat
                                                      thousandSeparator={true}
                                                      prefix={''}
                                                      customInput={TextField}
                                                      type="text"
                                                      // Các thuộc tính khác của TextField
                                                      defaultValue={row?.price}
                                                      sx={{ width: '50%' }}
                                                      size="small"
                                                      variant="standard"
                                                      onChange={(e) => handleChangePrice(e, index)}
                                                  />
                                              </TableCell>
                                              <TableCell component="th" scope="row">
                                                  <NumericFormat
                                                      thousandSeparator={true}
                                                      prefix={''}
                                                      customInput={TextField}
                                                      type="text"
                                                      // Các thuộc tính khác của TextField
                                                      defaultValue={row?.originalCost}
                                                      sx={{ width: '50%' }}
                                                      size="small"
                                                      variant="standard"
                                                      onChange={(e) => handleChangeOriginalCost(e, index)}
                                                  />
                                              </TableCell>
                                              <TableCell align="center">
                                                  <DeleteIcon
                                                      onClick={() => {
                                                          console.log(row, index);
                                                          console.log(addAttribute);
                                                          handleDelete(index);
                                                      }}
                                                  />
                                              </TableCell>
                                          </TableRow>
                                      );
                                  })
                                : ''}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ float: 'right', margin: '23px' }}>
                {!update ? (
                    <Button
                        variant="contained"
                        sx={{ margin: '10px' }}
                        onClick={() => {
                            setUpdate(true);
                        }}
                    >
                        Sửa
                    </Button>
                ) : (
                    <div>
                        <Button onClick={handleSave} variant="contained" sx={{ margin: '10px' }}>
                            Lưu
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ margin: '10px' }}
                            onClick={() => {
                                // alert('Thay đổi có thể không được lưu');
                                if (
                                    window.confirm('Thay đổi có thể không được lưu \n Bạn có chắc chắn muốn tiếp tục?')
                                ) {
                                    // Người dùng đã nhấn nút "OK"
                                    // Xử lý logic tiếp theo ở đây
                                    setUpdate(false);
                                    setAddAttribute([]);
                                } else {
                                    // Người dùng đã nhấn nút "Cancel" hoặc đóng hộp thoại
                                    // Xử lý logic khác (nếu cần) ở đây
                                }
                            }}
                        >
                            Thoát
                        </Button>
                    </div>
                )}
                {update ? (
                    ''
                ) : (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            handleClickOpen();
                            setDeleteProduct(true);
                        }}
                        sx={{ margin: '10px', backgroundColor: 'white' }}
                    >
                        Xóa
                    </Button>
                )}
            </Box>
            {/* dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Bạn có chắc chắn muốn xóa?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sau khi xóa sẽ không thể hoàn tác được
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={deleteProduct ? handleDeleteProduct : handleDeleteAttribute} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {/* dialog err */}
            <Dialog
                open={error}
                onClose={() => {
                    setError(false);
                    setErrorMessage('');
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {errorMessage.trim().length === 0 ? 'Thuộc tính đã tồn tại: ' : errorMessage}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorDetails?.map((item) => {
                            console.log(item);
                            return (
                                <span>
                                    {item?.size + ' ' + item?.color} <br />
                                </span>
                            );
                        })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setError(false);
                        }}
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <div>
                {/* <Button onClick={handleClickSnackBar}>Open simple snackbar</Button> */}
                <Snackbar
                    open={openSnackBar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackBar}
                    TransitionComponent={TransitionDown}
                    // message="Tạo sản phẩm thành công"
                    // action={action}
                >
                    <Alert sx={{ padding: '8px' }} severity="success" color="info">
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default ProductDetails;
