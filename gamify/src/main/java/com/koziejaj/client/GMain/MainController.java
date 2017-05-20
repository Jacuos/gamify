package com.koziejaj.client.GMain;

/**
 * Created by Jacek on 17-12-2016.
 */
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;



@Controller
//@RequestMapping(value = "/{path:^(?!api)[^\\.]*}")
public class MainController {
    @RequestMapping(value = "/{path:^(?!api)[^\\.]*}")
    public String redirect() { return "forward:/"; }
    @RequestMapping(value = "/gadmin/**")
    public String redirect2() { return "forward:/"; }



    /*@RequestMapping(value="/*", produces = "text/html;charset=UTF-8")
    public String index() {
        return "index";
    }*/
     /*
    @RequestMapping(value="/greeting")
        public String greeting(@RequestParam(value="name", required=false, defaultValue="World") String name, Model model){
            model.addAttribute("name",repository.findOne(1L));
            return "greeting";
    }*/
}
