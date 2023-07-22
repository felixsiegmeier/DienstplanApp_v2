"use client"
import React, { useState, useEffect } from 'react';
import DaysRangePicker from '../components/DaysRangePicker';

const Calendar = () => {
  return <div className="text-center mt-4">
  <h1 className="text-3xl font-bold mb-4"> Urlaubsplan </h1>
    <DaysRangePicker days={31} blueData={[15,18]} greenData={[1,5,21,23]} redData={[3,4,22,24,25,26,27,28]} orangeData={[6,7,8,9,10,11,12]} />
  </div>;
};

export default Calendar;