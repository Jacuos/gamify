package com.koziejaj.client;

/**
 * Created by Jacek on 17-12-2016.
 */
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import javax.annotation.Resource;

import oracle.jdbc.pool.OracleDataSource;


@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @Resource
    Environment environment;
    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx, GUserRepository repository) {

        return args -> {
            //Prints all the beans included in project. Commented-out for boot performance
            /*System.out.println("Let's inspect the beans provided by Spring Boot:");

            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }*/
            System.out.println("\nServer port: localhost:"+environment.getProperty("local.server.port")+'\n');
            // save a couple of GUsers
            /*repository.save(new GUser("Jack", "Bauer", "Cleaner"));
            repository.save(new GUser("Chloe", "O'Brian", "CEO. A dumbass."));
            repository.save(new GUser("Kim", "Bauer", "Core programmer"));
            repository.save(new GUser("David", "Palmer", "frontend artist"));
            repository.save(new GUser("Michelle", "Dessler", "designer"));*/

            // fetch all GUsers
            System.out.println("GUsers found with findAll():");
            System.out.println("-------------------------------");
            for (GUser guser : repository.findAll()) {
                System.out.println(guser.toString());
            }
            System.out.println("");

            // fetch an individual GUser by ID
            GUser GUser = repository.findOne(1L);
            System.out.println("GUser found with findOne(1L):");
            System.out.println("--------------------------------");
            System.out.println(GUser.toString());
            System.out.println("");

            // fetch GUsers by last name
            System.out.println("GUser found with findByLastName('Bauer'):");
            System.out.println("--------------------------------------------");
            for (GUser bauer : repository.findByLastName("Taperek")) {
                System.out.println(bauer.toString());
            }
            System.out.println("");
        };
    }

}