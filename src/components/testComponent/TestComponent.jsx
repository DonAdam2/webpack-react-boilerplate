import { useDispatch, useSelector } from 'react-redux';

import { getTestAction } from '@/store/app/selectors/AppSelectors';
import { updateTestString } from '@/store/app/slices/AppSlice';

const TestComponent = () => {
  const dispatch = useDispatch(),
    testAction = useSelector((state) => getTestAction({ state }));

  return (
    <div className="container">
      <p>
        Current environment API is <strong>{process.env.BASE_URL}</strong>
      </p>
      <p>
        Testing the store <strong>{testAction}</strong>
      </p>
      <button onClick={() => dispatch(updateTestString())}>Change text</button>
    </div>
  );
};

export default TestComponent;
