package com.koziejaj.client.GSecurity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Jacek on 2017-05-11.
 */
@Entity
public class GToken {

    @Id
    private String login;
    private String token;
    private boolean isAdmin;

    public GToken() {}

    public GToken(String l, String t, boolean is) {
        login = l;
        token = t;
        isAdmin = is;
    }

    }
