import { tool as createTool } from 'ai';
import { z } from 'zod';

import { FCDOResponse } from '../model/fco.model';

export const fcdoTool = createTool({
  description: 
  'Display the FCDO guidance for a destination',
  parameters: z.object({
    country: z.string().describe('The country of the location to get the guidance for')
  }),
  execute: async function ({ country }) {
    // While a historical forecast may be better, this example gets the next 3 days
    const url = `https://www.gov.uk/api/content/foreign-travel-advice/${country.toLowerCase()}`;
    
    try {
      const response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
      const fcoResponse: FCDOResponse = await response.json();

      const alertStatus: string = fcoResponse.details.alert_status.length == 0 ? 'Unknown' : 
      fcoResponse.details.alert_status[0].replaceAll('_', ' ');

      return { 
        status: alertStatus, 
        url: fcoResponse.details?.document?.url
      };
    } catch(e) {
      console.error(e);
      return { 
        message: 'Unable to obtain FCDO information', 
        location: location
      };
    }
  }
});