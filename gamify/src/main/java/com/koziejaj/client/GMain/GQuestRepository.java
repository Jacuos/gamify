package com.koziejaj.client.GMain;
/**
 * Created by Jacek on 2017-02-24.
 */

import org.springframework.data.repository.CrudRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by Jacek on 18-12-2016.
 */
@RepositoryRestResource(collectionResourceRel = "GQuests", path = "GQuests")
public interface GQuestRepository extends CrudRepository<GQuest, Long> {
    GQuest findById(Long id);
}