package com.koziejaj.client;

import java.io.Serializable;

/**
 * Created by Jacek on 2017-02-24.
 */
public class UQId implements Serializable {

    private Long guserId;
    private Long gquestId;

    public UQId(){}
    public Long getGUserId() {
        return guserId;
    }

    public void setGUserId(Long GUserId) {
        this.guserId = GUserId;
    }

    public Long getGQUestId() {
        return gquestId;
    }

    public void setGQUestId(Long GQUestId) {
        this.gquestId = GQUestId;
    }
}
