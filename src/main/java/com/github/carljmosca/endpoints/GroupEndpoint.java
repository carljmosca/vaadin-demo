package com.github.carljmosca.endpoints;

import java.util.ArrayList;
import java.util.List;

import com.github.carljmosca.pojo.Group;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
public class GroupEndpoint {

    List<Group> result = new ArrayList<>();

    public GroupEndpoint() {
        populateList();
    }

    @AnonymousAllowed
    public List<Group> findAll(String filter, int limit) {
        return result;
    }

    private void addGroup(String value, String label) {
        Group group = new Group();
        group.setValue(value);
        group.setLabel(label);
        result.add(group);
    }

    private void populateList() {
        addGroup( "1", "Group 1");
        addGroup("2", "Group 2");
        addGroup("3", "Group 3");
    }

}