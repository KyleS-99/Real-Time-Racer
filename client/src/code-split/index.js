import Loadable from 'react-loadable';

import Spinner from '../components/common/Spinner';

export const Landing = Loadable({
    loader: () => import('../components/Landing/Landing'),
    loading: Spinner,
    delay: 500
});
