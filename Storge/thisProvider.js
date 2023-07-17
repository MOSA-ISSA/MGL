import React, {useState} from 'react';

import TheContext from './thisContext';
import { images } from '../src/asets/images/exportImages';

const TheProvider = props => {

  const image ='https://th.bing.com/th?q=Microsoft+Account+Logo&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-WW&cc=IL&setlang=en&adlt=moderate&t=1&mw=247'
  const imageBackground ='https://th.bing.com/th/id/OIP.34cf-5PMzd2uKmixOC_2EgAAAA?pid=ImgDet&w=199&h=199&c=7&dpr=1.3'

  // const [list,setList]=useState({
  //   played:[],
  //   planToPlay:[],
  //   playing:[],
  //   trash:[],
  // })

  const [tirs,setTiers] =useState({})

  const [User,setUser] = useState({
    ID:'',
    name: '',
    password: '',
    logged: false,
    mail : '',
    image :images.ID,
    imageBackground : images.backgraund,
    list:{
      played:[],
      planToPlay:[],
      playing:[],
      trash:[],
    }
  })

  const [admin,setAdmin]= useState(0)

  return (
    <TheContext.Provider
      value={{
        User,
        setUser,
        image,
        imageBackground,
        admin,
        setAdmin,
        // list,
      }}>
      {props.children}
    </TheContext.Provider>
  );
};

export default TheProvider;