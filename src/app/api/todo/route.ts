import data from '../data.json';
import { NextResponse } from 'next/server';
import fs from 'fs';
import { it } from 'node:test';
import { log } from 'console';

export async function GET(){
    return NextResponse.json({
        success: true,
        count: data.length,
        data
    
    });
}

export async function POST(request:Request){
    const body = await request.json();
    body.id = data.length + 1;
    data.push(body);

    try {
        fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
        console.log('Data created and saved to data.json');
      } catch (error) {
        console.error('Error creating data to data.json', error);
        return
      }


    return NextResponse.json({
        success: true,
        data: body
    })

}

export async function PATCH(request: Request, context: any) {
    const { params } = context;
    const itemToUpdate = data.filter((item: any) => item.id.toString() === params.id);
  
    if (itemToUpdate.length === 0) {
      return {message:"Item not found"};
    }
  
    console.log("Item to update", itemToUpdate[0]);
    itemToUpdate[0].completed = !itemToUpdate[0].completed;
  
    try {
      fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
      console.log('Data updated and saved to data.json');
    } catch (error) {
      console.error('Error updating data to data.json', error);
      return {message:"Error updating data to data.json"};
    }
  
    return NextResponse.json({
      success: true,
      data: itemToUpdate[0]
    });
  }