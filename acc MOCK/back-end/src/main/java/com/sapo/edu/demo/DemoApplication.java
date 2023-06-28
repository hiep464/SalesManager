package com.sapo.edu.demo;

import com.sapo.edu.demo.entities.User;
import com.sapo.edu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.sapo.edu.demo.repository.ProductRepository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		User hiep = new User();
		hiep.setId(1);
		hiep.setUsername("admin");
		hiep.setPassword(passwordEncoder.encode("hiep"));
		hiep.setRole("ADMIN");
		hiep.setStaffCode("S001");
		userRepository.save(hiep);
		User duan = new User();
		duan.setId(2);
		duan.setUsername("sales");
		duan.setPassword(passwordEncoder.encode("duan"));
		duan.setRole("SALES");
		duan.setStaffCode("S002");
		userRepository.save(duan);
		User duy = new User();
		duy.setId(3);
		duy.setUsername("care");
		duy.setPassword(passwordEncoder.encode("duy"));
		duy.setRole("CARE");
		duy.setStaffCode("S003");
		userRepository.save(duy);
		User bao = new User();
		bao.setId(4);
		bao.setUsername("inventory");
		bao.setPassword(passwordEncoder.encode("bao"));
		bao.setRole("INVENTORY");
		bao.setStaffCode("S004");
		userRepository.save(bao);
	}
}
