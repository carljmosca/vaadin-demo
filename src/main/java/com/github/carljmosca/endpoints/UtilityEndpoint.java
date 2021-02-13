/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.github.carljmosca.endpoints;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author moscac
 */
@Endpoint
public class UtilityEndpoint {
    
    @AnonymousAllowed
    public String getSysInfo() {
        return String.format("Running on %s", getHostIp());
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
