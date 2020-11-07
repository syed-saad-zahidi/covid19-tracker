import React from 'react';
import {Card , CardContent, Typography} from '@material-ui/core'

function Infobox({title , cases , total}) {
    return (
      <Card className="infobox">
          <CardContent>
              {/*title ie Coronavirus Cases */}
              <Typography className="infobox__title">
             {title}              </Typography>

             {/*120k number of cases */}
             <h2 className="infobox__cases">{cases}</h2>
         <Typography className="infobox__total">
             {total} total
   

   

         </Typography>
          </CardContent>
      </Card>
    )
}

export default Infobox
