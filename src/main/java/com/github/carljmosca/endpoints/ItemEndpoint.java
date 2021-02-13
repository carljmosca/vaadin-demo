/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.github.carljmosca.endpoints;

import com.github.carljmosca.pojo.Item;
import com.hazelcast.client.HazelcastClient;
import com.hazelcast.core.HazelcastInstance;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.List;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author moscac
 */
@Endpoint
public class ItemEndpoint {

    List<Item> result = new ArrayList<>();

    public ItemEndpoint() {
        populateList();
    }

    @AnonymousAllowed
    public List<Item> findAll(String filter, int limit) {

        return result;
    }

    private void addItem(String img, String name, String date, String posts,
            String likes, String comments, String shares) {
        Item item = new Item();
        item.setImg(img);
        item.setName(name + "(" + getHostIp() + ")");
        item.setDate(date);
        item.setPost(posts);
        item.setLikes(likes);
        item.setComments(comments);
        item.setShares(shares);
        result.add(item);
    }

    private void populateList() {
        addItem("https://randomuser.me/api/portraits/men/42.jpg",
                "John Smith",
                "May 8",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20");
        addItem(
                "https://randomuser.me/api/portraits/women/42.jpg",
                "Abagail Libbie",
                "May 3",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20"
        );
        addItem(
                "https://randomuser.me/api/portraits/men/24.jpg",
                "Alberto Raya",
                "May 3",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20"
        );

        addItem(
                "https://randomuser.me/api/portraits/women/24.jpg",
                "Emmy Elsner",
                "Apr 22",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20"
        );
        addItem(
                "https://randomuser.me/api/portraits/men/76.jpg",
                "Alf Huncoot",
                "Apr 21",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20"
        );

        addItem(
                "https://randomuser.me/api/portraits/women/76.jpg",
                "Lidmila Vilensky",
                "Apr 17",
                "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).",
                "1K",
                "500",
                "20"
        );

    }

    private String getHostIp() {
        String ip = "";
        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException ex) {
            Logger.getLogger(ItemEndpoint.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ip;
    }
}
