package com.koziejaj.client.GLogin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;


@RestController
public class GLoginController {
    @Autowired
    private GLoginRepository gLoginRep;

    @RequestMapping(value="/api/glogin", method = RequestMethod.POST)
    public GLogin login(@RequestBody GLogin postData) {
        List<GLogin> list = gLoginRep.findByLoginAndPassword(postData.getLogin(),postData.getPassword());
        if(list.size()>0) {
            GLogin model = list.get(0);
            return model;
        }
        else return null;
    }
}
