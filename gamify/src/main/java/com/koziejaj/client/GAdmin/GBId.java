package com.koziejaj.client.GAdmin;

/**
 * Created by Jacek on 2017-05-05.
 */

import java.io.Serializable;


/**
 * Created by Jacek on 2017-02-24.
 */
public class GBId implements Serializable {

    private String login;
    private String badge;

    public GBId(){}

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }
}
