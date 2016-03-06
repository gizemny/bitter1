<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	/**
     * Get the user that owns the post.
     */    
	public function user () {
		$this->belongsTo('\App\User');
	}

	/**
     * Get the users that favorited the post.
     */   
    public function postUser () {
		$this->belongsToMany('\App\User');
	}
}
