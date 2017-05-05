package com.koziejaj.client.GAdmin;

/**
 * Created by Jacek on 2017-05-05.
 */

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(GBId.class)
public class GBadge{

    @Id
    private String login;
    @Id
    private String badge;

    public GBadge() {
    }

    public GBadge(String i, String v) {
        login = i;
        badge = v;
    }

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
