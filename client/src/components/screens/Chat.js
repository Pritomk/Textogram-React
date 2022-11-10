import React, { useState, useEffect, useContext } from "react";
 const Chat = () => {
    return(
        <div>
            <nav class="chat_main">
            <div class="chat_head" style="height: 20%">
                <h3>Messages</h3>
                <hr>
                <div class="search-header-chats" style="border: radius 2px;">
                    <form id="search-form">
                        <input type="text" id="new-task-input" placeholder="Search...">
                    </form>
                </div>
            </div>

            <div class="chat_body" style="height: 78%">
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px; font-family: Arial, Helvetica, sans-serif;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
                <div class="user1">
                    <div class="user_chat">
                        <div style="width: 20%;height: 50px; float:left; background-color: transparent;">
                            <i class="material-icons">account_circle</i>
                         </div>
                         
                         <div style="width: 80%; float:right;background-color: transparent; padding-top: 10px;">
                            <a href="/chats-open.html" class="user-name">User Name</a>
                         </div>
                    </div>
                </div>
        
            </div>
        </nav>
        <nav class="active_users">
            <div class="active_users_title">
                <div class="profile-left">
                    <div class="image">
                        <i class="fa-sharp fa-solid fa-a"></i>
                        <p></p>
                    </div>
                </div>
                <div class="profile-right"></div>

            </div>

        </nav>
        </div>
    )
 }

 export default Chat