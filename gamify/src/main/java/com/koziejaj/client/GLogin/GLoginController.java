package com.koziejaj.client.GLogin;
/**
 * Created by Jacek on 21-01-2017.
 */
import com.koziejaj.client.GLogin.GLoginRepository;
import com.koziejaj.client.GUserQRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.koziejaj.client.GUserRepository;
import com.koziejaj.client.GUser;

import java.io.IOException;
import java.util.*;


@RestController
public class GLoginController {
    @Autowired
    private GLoginRepository gLoginRep;
    @Autowired
    private GUserRepository gUserRep;
    @Autowired
    private GUserQRepository guserQRep;

    @RequestMapping(value="/api/glogin", method = RequestMethod.POST)
    public GLogin login(@RequestBody GLogin postData) {
        List<GLogin> list = gLoginRep.findByLoginAndPassword(postData.getLogin(),postData.getPassword());
        if(list.size()>0) {
            GLogin model = list.get(0);
            return model;
        }
        else return null;
    }

    @RequestMapping(value="/api/addguser", method = RequestMethod.POST)
    public boolean guserRegister(@RequestBody String postData) throws IOException {
        postData = postData.substring(9,postData.length()-1);
        HashMap<String,String> result = new ObjectMapper().readValue(postData, HashMap.class);
        String newLogin = result.get("login");
        if(gLoginRep.findByLogin(newLogin)==null) {
            gLoginRep.save(new GLogin(newLogin, result.get("password"), result.get("email")));
            gUserRep.save(new GUser(newLogin, result.get("firstName"), result.get("lastName"), result.get("description")));
            return true;
        }
        else
            return false;
    }
}
