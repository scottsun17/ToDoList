package com.avocadues.todolist.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class User implements Serializable {

	private String uid;

	

	public String getUid(){
		return this.uid;
	}

	public void setUid(String uid){
		this.uid = uid;
	}

}
