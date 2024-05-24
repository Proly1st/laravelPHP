<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Http;
class HttpPostController extends Controller
{
    public function index()
    {
        return view('index');

    }
    public function callApi()
    {
//        $response1 =[
//            'status' =>200,
//            'message' => 'success',
//            'data' => "abc"
//        ];
        $client = new Client([
            'base_uri' => 'http://172.16.10.118:7080/api/v9/',
            'headers' => [
                'Authorization' => 'Bearer 45a15d5b-b54c-4f24-8887-c38ea02f0e37',
                'ProjectId' => 8001,
                'Method' => 0
            ]
        ]);

        try {
            $response = $client->request('GET', 'admins?admin_role_id=-1&status=-1');
            $data = json_decode($response->getBody(), true);

            $response1 =[
                'status' =>200,
                'message' => 'success',
                'data' => $data
            ];

        }catch (GuzzleException $ex){
            $response1 = [
                'status' => 500,
                'message' => $ex,
                'data' => null
            ];
        }

        return $response1;
    }
}
