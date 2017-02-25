package com.koziejaj.client;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * Created by Jacek on 18-12-2016.
 */
@Entity
public class GUser {

    @Id
    @GeneratedValue
    private Long id;
    private String login, firstName, lastName, description;
    private int exp, lvl;

    public GUser() {}

    public GUser(String login, String firstName, String lastName, String description) {
        this.login = login;
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.exp = 0;
        this.lvl =0;
    }

    @Override
    public String toString() {
        return String.format(
                "GUser[id=%d, login='%s', firstName='%s', lastName='%s']",
                id, login,firstName, lastName);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getExp() {
        return exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public int getLvl() {
        return lvl;
    }

    public void setLvl(int lvl) {
        this.lvl = lvl;
    }
}
