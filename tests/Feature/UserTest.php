<?php

test('can show all the users info', function () {
    $response = $this->get('/api/users');

//    $response->assertStatus(200);
    expect($response)->assertStatus(200);
});
