<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKartuRfidTable extends Migration
{
    public function up()
    {
        Schema::create('kartu_rfid', function (Blueprint $table) {
            $table->id('id_kartu_rfid');
            $table->string('kode_rfid', 255)->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kartu_rfid');
    }
}
