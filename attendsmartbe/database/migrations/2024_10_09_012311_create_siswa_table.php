<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiswaTable extends Migration
{
    public function up()
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->id('id_siswa');
            $table->string('nisn', 10)->unique();
            $table->string('nama_siswa', 255);
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->date('tanggal_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->unsignedBigInteger('id_kelas')->nullable();
            $table->string('no_telp', 15)->nullable();
            $table->unsignedBigInteger('id_kartu_rfid')->unique()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('siswa');
    }
}
