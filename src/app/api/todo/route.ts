import data from '../data.json';
import { NextResponse } from 'next/server';

export async function GET(){
    return NextResponse.json({
        success: true,
        count: data.length,
        data
    
    });
}
