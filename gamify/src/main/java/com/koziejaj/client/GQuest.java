package com.koziejaj.client;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * Created by Jacek on 2017-02-24.
 */
@Entity
public class GQuest {
    @Id
    private Long id;
    private String description;
    private int exp;
    private LocalDateTime endOf;

    public GQuest(){

    }
    public GQuest(Long i, String d, int ex, LocalDateTime en){
        id =i;
        description = d;
        exp = ex;
        endOf = en;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getEndOf() {
        return endOf;
    }

    public void setEndOf(LocalDateTime endOf) {
        this.endOf = endOf;
    }
}
