<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * Get the posts associated with user.
     */    
    public function posts () {
        $this->hasMany('\App\Post');
    } 
    /**
     * Get the posts user belongs to - has favorited.
     */    
    public function postUser () {
        $this->belongsToMany('\App\Post');
    }       
}
