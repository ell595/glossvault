<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Facades\DB;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function glosses(): HasManyThrough
    {
        return $this->hasManyThrough(
            Gloss::class,
            CollectionsGlosses::class,
            'collection_id', // Foreign key on the environments table...
            'id', // Foreign key on the deployments table...
            'id', // Local key on the projects table...
            'gloss_id' //
        ); 
    }

    public function getGlosses()
    {
        return $this->glosses()->get();
    }

    public function deleteReferences()
    {
        $glosses = DB::table('collections_glosses')->where('collection_id', $this->id)->get();
        foreach ($glosses as $gloss) {
            DB::delete('delete from glosses where id = ?', [$gloss->gloss_id]);
        }
        DB::delete('delete from users_collections where collection_id = ?', [$this->id]);
        DB::delete('delete from collections_glosses where collection_id = ?', [$this->id]);
        $this->delete();
    }

    public function addReferences($user_id)
    {
        DB::insert('insert into users_collections (user_id, collection_id) values (?, ?)', [$user_id, $this->id]);
    }
}