import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { convertToNumberArray, flattenArrays } from '@/utils/helper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch the webpage content
    const response = await axios.get('https://kqxs.vn/');
    const html = response.data;
    const $ = cheerio.load(html);

    // Find the first table and extract data
    const tableData: any = [];
    const bodyElement = $('body').first();

    // Get headers
    const headers: string[] = [];

    // Get rows
    bodyElement.find('table#result_1').find('tr').each((index, row) => {
      if (index > 10) return
      const rowData: any = {};
      $(row).find('[data-prize]').each((index, cell) => {
        rowData[headers[index] || `column${index}`] = $(cell).text().trim().replaceAll(/[\.\s]/g, '');
      });
      if (Object.keys(rowData).length) {
        tableData.push(rowData);
      }
    });

    res.status(200).json({ success: true, data: flattenArrays(convertToNumberArray(tableData)) });
  } catch (error) {
    console.error('Error crawling data:', error);
    res.status(500).json({ success: false, error: 'Failed to crawl data' });
  }
}