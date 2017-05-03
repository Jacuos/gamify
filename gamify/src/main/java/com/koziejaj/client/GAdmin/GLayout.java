package com.koziejaj.client.GAdmin;

/**
 * Created by Jacek on 2017-04-30.
 */
import javax.persistence.Entity;
import javax.persistence.Id;
@Entity
public class GLayout {

    @Id
    private String id;
    private String value;

    public GLayout() {}

    public GLayout(String i, String v) {
        id = i;
        value = v;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return String.format(
                "GLayout[id=%s, value=%s]",
                id,value);
    }

}
