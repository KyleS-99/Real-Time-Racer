import Loadable from 'react-loadable';

import Spinner from '../components/common/Spinner';

export const Landing = Loadable({
    loader: () => import('../components/Landing/Landing'),
    loading: Spinner,
    delay: 500
});

export const Dashboard = Loadable({
    loader: () => import('../components/Dashboard/Dashboard'),
    loading: Spinner,
    delay: 500
});

export const Practice = Loadable({
    loader: () => import('../components/Practice/Practice'),
    loading: Spinner,
    delay: 500
});

export const PracticeResult = Loadable({
    loader: () => import('../components/PracticeResult/PracticeResult'),
    loading: Spinner,
    delay: 500
});