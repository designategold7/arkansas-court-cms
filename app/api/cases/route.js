import pool from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search parameter is required.' }, { status: 400 });
  }
  try {
    const [rows] = await pool.execute(
      `SELECT case_id, docket_number, case_title, case_type, status, filing_date 
       FROM arkansas_court_docket 
       WHERE case_title LIKE ? OR docket_number LIKE ? 
       ORDER BY filing_date DESC 
       LIMIT 50`,
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );
   
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}