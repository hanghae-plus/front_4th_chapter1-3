import { Fragment } from 'react';
import Header from './Header';
import ItemList from './ItemList';
import ComplexForm from './ComplexForm';
import { memo } from '../@lib';
import ItemsProvider from './providers/ItemsProvider';

const Content = memo(() => {
  return (
    <Fragment>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemsProvider>
              <ItemList />
            </ItemsProvider>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

export default Content;
