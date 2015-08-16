package awesomeApp;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


@ComponentScan
@EnableAutoConfiguration

/**
 * 
 * @author orzech
 *
 */
public class App {
	
	
	public static void main(String[] args) throws IOException {
		
		SpringApplication.run(App.class, args);
	}
}

