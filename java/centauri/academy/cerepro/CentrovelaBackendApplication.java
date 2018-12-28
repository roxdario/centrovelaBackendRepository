package centauri.academy.cerepro;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@ComponentScan({"com.ross.dario"})
@EntityScan("com.ross.dario.persistence.entity")
@EnableJpaRepositories("com.ross.dario..persistence.repository")

public class CentrovelaBackendApplication extends SpringBootServletInitializer{

	private static final Logger logger = LogManager.getLogger(CentrovelaBackendApplication.class);
	 @Override
	    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	        return application.sources(CentrovelaBackendApplication.class);
	    }
	public static void main(String[] args) {
		logger.info("APPLICATION IS STARTING!!!!!!");
		ApplicationContext applicationContext = 
				SpringApplication.run(CentrovelaBackendApplication.class, args);
		
		for (String name : applicationContext.getBeanDefinitionNames()) {
			logger.info(name);
		}
		logger.info("APPLICATION STARTED!!!!!!");
	}
}
