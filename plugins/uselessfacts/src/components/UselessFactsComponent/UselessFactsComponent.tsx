import React from 'react';
import { useAsync } from 'react-use';
import {
 Progress,
 ResponseErrorPanel,
 InfoCard,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { UselessFactsApiRef } from '../../api';
import { UselessFact } from '../../types';
import { useEntity } from '@backstage/plugin-catalog-react';
import { UseUselessFactsAppData } from '../uselessfacts_helper';
import { Box,Typography } from '@material-ui/core';


export const UselessFactCard = () => {
 const UselessFactClient = useApi(UselessFactsApiRef);
 const { entity } = useEntity();
 const { uselessFactType } = UseUselessFactsAppData({ entity });


const { value, loading, error } = useAsync(
 async (): Promise<UselessFact | undefined> => {
 const productSyncIdResponse = await UselessFactClient.getUselessFact(uselessFactType);
 
return productSyncIdResponse;
 },
 );

if (loading) {
 return <Progress />;
 } else if (error) {
 return <ResponseErrorPanel error={error} />;
 }

return (
 <Box>
 <InfoCard title="UselessFacts">
 <Typography variant="body1">
 <b>Id: </b>{value?.id}
 </Typography>
 <Typography variant="body1">
 <b>Useless fact: </b>{value?.text}
 </Typography>
 <Typography variant="body1">
 <b>Source: </b>{value?.source}
 </Typography>
 <Typography variant="body1">
 <b>Source URL: </b>{value?.source_url}
 </Typography>
 </InfoCard>
 </Box>
 );
};