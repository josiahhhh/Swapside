import { Box, Loader as TripleLoader } from '@mantine/core';

const Loader = () => (
  <Box sx={{ flex: 'wrap', justifyItems: 'center', paddingTop: '250px' }}>
    <TripleLoader color="yellow" size={300} />
  </Box>
);

export default Loader;
