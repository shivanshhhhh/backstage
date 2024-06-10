// Import core libraries
import {
 ConfigApi,
 createApiRef,
 DiscoveryApi,
 } from '@backstage/core-plugin-api';
 
 // Import API types
 import { UselessFact } from '../types';

// Define API default proxy path
 const DEFAULT_PROXY_PATH = '/uselessfacts/api';

// Define API options
 export type Options = {
 discoveryApi: DiscoveryApi;
 configApi: ConfigApi;
 };

// Defining API client interface
 export interface UselessFactsApi {
 getUselessFact(uselessfact_type: string): Promise<UselessFact>;
 }
 
 // Create an API reference
 export const UselessFactsApiRef = createApiRef<UselessFactsApi>({
 id: 'plugin.useless-facts-api.service',
 });

// Create the API client
 export class UselessFactsApiClient implements UselessFactsApi {


 private readonly discoveryApi: DiscoveryApi;
 private readonly configApi: ConfigApi;
 
 // Declare constructor
 constructor(options: Options) {
 this.discoveryApi = options.discoveryApi;
 this.configApi = options.configApi;
 }


// Obtain baseURL
 private async getBaseUrl() {
 const proxyPath =
 this.configApi.getOptionalString('uselessfacts.proxyPath') ||
 DEFAULT_PROXY_PATH;
 return `${await this.discoveryApi.getBaseUrl('proxy')}${proxyPath}`;
 }
 
 // create method to fetch data
 private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
 
// As configured previously for the backend proxy
 const proxyUrl = await this.getBaseUrl();
const resp = await fetch(`${proxyUrl}${input}`, init);
 if (!resp.ok) throw new Error(resp.statusText);
 return await resp.json();
 }

// create getUselessFact data method and specify query
 async getUselessFact(uselessfact_type: string): Promise<UselessFact> {
 if (uselessfact_type == "Random")
 return await this.fetch<UselessFact>('/api/v2/facts/random');
 else
 return await this.fetch<UselessFact>('/api/v2/facts/today');
 }
}