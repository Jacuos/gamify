package com.koziejaj.client;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
/**
 * Created by Jacek on 2017-02-24.
 */
@Entity @IdClass(UQId.class)
public class GUserQ {
    @Id
    private Long guserId;
    @Id
    private Long gquestId;

    public GUserQ(){}

    public GUserQ(Long uid, Long qid){
        guserId = uid;
        gquestId = qid;
    }

    public Long getGUserId() {
        return guserId;
    }

    public void setGUserId(Long GUserId) {
        this.guserId = GUserId;
    }

    public Long getGQuestId() {
        return gquestId;
    }

    public void setGQuestId(Long GQUestId) {
        this.gquestId = GQUestId;
    }
}
