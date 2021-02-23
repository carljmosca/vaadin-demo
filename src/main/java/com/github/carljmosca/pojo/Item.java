/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.github.carljmosca.pojo;

import java.util.Optional;
/**
 *
 * @author moscac
 */

public class Item {
    private String img;
    private Optional<String> name = Optional.empty();
    private String date;
    private String post;
    private String likes;
    private String comments;
    private Optional<String> shares = Optional.empty();
    private String group;

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getName() {
        return name.orElse("");
    }

    public void setName(String name) {
        this.name = Optional.ofNullable(name);
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getLikes() {
        return likes;
    }

    public void setLikes(String likes) {
        this.likes = likes;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getShares() {
        return shares.orElse("");
    }

    public void setShares(String shares) {
        this.shares = Optional.ofNullable(shares);
    }
    
    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

}
