import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Logo({ className = '' }) {
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const path = authStatus ? '/ide' : '/';
  return (
    <Link to={path}>
      <div>
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 72 72"
          id="emoji"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className}`}
        >
          <g id="color">
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M28.1271,22.7636 c-0.3952,2.3126-0.6857,4.7995-0.8483,7.4259c-3.3469,1.871-6.3451,3.8466-8.8669,5.8105 c-6.1591-4.7995-9.4596-9.5293-8.0767-12.4346C11.9041,20.2651,19.0277,20.1604,28.1271,22.7636z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M62.6417,48.4346 c-1.5688,3.3004-8.6926,3.405-17.8035,0.8019c-2.638-0.7554-5.4504-1.7432-8.344-2.9518 c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728 c-0.128-1.8826-0.1976-3.8233-0.1976-5.8222c0-1.9872,0.0697-3.9396,0.1976-5.8105c1.6385-0.918,3.37-1.8129,5.1713-2.6728 c1.3597-0.6508,2.7078-1.2551,4.0441-1.8013c1.325,0.5578,2.6729,1.1505,4.0325,1.8013c1.8013,0.8483,3.5212,1.7432,5.1598,2.6612 c0.1278,1.8826,0.1976,3.8234,0.1976,5.8222c0,1.9989-0.0698,3.9512-0.1976,5.8338c3.3585-1.8826,6.3568-3.8582,8.8785-5.8338 C60.7243,40.7995,64.0247,45.5293,62.6417,48.4346z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M44.8382,49.2364 c-1.5456,9.3433-4.7065,15.7233-8.3556,15.7233c-3.6489,0-6.8098-6.38-8.3555-15.7233c2.6496-0.7554,5.4619-1.7432,8.3671-2.9518 C39.3879,47.4933,42.2002,48.481,44.8382,49.2364z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M44.8382,22.7636 c-2.638,0.7554-5.4504,1.7432-8.344,2.9518c-2.9053-1.2086-5.7175-2.1964-8.3671-2.9518 c1.5573-9.3433,4.7066-15.7233,8.3555-15.7233C40.1318,7.0402,43.2811,13.4202,44.8382,22.7636z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M36.4942,25.7154 c-1.3363,0.5462-2.6844,1.1505-4.0441,1.8013c-1.8013,0.8599-3.5329,1.7548-5.1713,2.6728 c0.1626-2.6264,0.4531-5.1133,0.8483-7.4259C30.7767,23.519,33.589,24.5067,36.4942,25.7154z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.8842,36 c0,1.9989-0.0698,3.9512-0.1976,5.8338c-0.1627,2.6147-0.4532,5.1016-0.8483,7.4026c-2.638-0.7554-5.4504-1.7432-8.344-2.9518 c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728 c-0.128-1.8826-0.1976-3.8233-0.1976-5.8222c0-1.9872,0.0697-3.9396,0.1976-5.8105c1.6385-0.918,3.37-1.8129,5.1713-2.6728 c1.3597-0.6508,2.7078-1.2551,4.0441-1.8013c1.325,0.5578,2.6729,1.1505,4.0325,1.8013c1.8013,0.8483,3.5212,1.7432,5.1598,2.6612 C45.8144,32.0604,45.8842,34.0012,45.8842,36z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M36.4942,46.2846 c-2.9053,1.2086-5.7175,2.1964-8.3671,2.9518c-0.3952-2.301-0.6857-4.7995-0.8483-7.4143c1.6385,0.918,3.37,1.8129,5.1713,2.6728 C33.8098,45.1458,35.1579,45.7385,36.4942,46.2846z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M28.1271,49.2364 c-9.111,2.6031-16.223,2.4869-17.792-0.8019C8.9523,45.5293,12.2528,40.7995,18.4119,36c2.5218,1.9756,5.52,3.9512,8.8669,5.8222 C27.4413,44.4369,27.7319,46.9354,28.1271,49.2364z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M27.0812,36 c0,1.9989,0.0697,3.9396,0.1976,5.8222c-3.3469-1.871-6.3451-3.8466-8.8669-5.8222c2.5218-1.964,5.52-3.9396,8.8669-5.8105 C27.1508,32.0604,27.0812,34.0128,27.0812,36z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.6866,30.1778 c-1.6386-0.918-3.3585-1.8129-5.1598-2.6612c-1.3596-0.6508-2.7075-1.2435-4.0325-1.8013c2.8936-1.2086,5.706-2.1964,8.344-2.9518 C45.2333,25.0646,45.5238,27.5631,45.6866,30.1778z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.8"
              d="M54.5651,36 c-2.5217-1.964-5.52-3.9396-8.8785-5.8222c-0.1627-2.6147-0.4532-5.1132-0.8483-7.4143 c9.1109-2.6031,16.2346-2.4985,17.8035,0.8019C64.0247,26.4707,60.7243,31.2005,54.5651,36z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.6866,41.8338 c0.1278-1.8826,0.1976-3.8349,0.1976-5.8338c0-1.9988-0.0698-3.9396-0.1976-5.8222c3.3585,1.8826,6.3568,3.8582,8.8785,5.8222 C52.0434,37.9756,49.0451,39.9512,45.6866,41.8338z"
            />
            <path
              fill="#92D3F5"
              stroke="#92D3F5"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.8842,36 c0,1.9989-0.0698,3.9512-0.1976,5.8338c-1.6386,0.918-3.3585,1.8129-5.1598,2.6612c-1.3596,0.6391-2.7075,1.2435-4.0325,1.7896 c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728 c-0.128-1.8826-0.1976-3.8233-0.1976-5.8222c0-1.9872,0.0697-3.9396,0.1976-5.8105c1.6385-0.918,3.37-1.8129,5.1713-2.6728 c1.3597-0.6508,2.7078-1.2551,4.0441-1.8013c1.325,0.5578,2.6729,1.1505,4.0325,1.8013c1.8013,0.8483,3.5212,1.7432,5.1598,2.6612 C45.8144,32.0604,45.8842,34.0012,45.8842,36z"
            />
          </g>
          <g id="hair" />
          <g id="skin" />
          <g id="skin-shadow" />
          <g id="line">
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M18.4119,36 c-6.1591-4.7995-9.4596-9.5293-8.0767-12.4346c1.569-3.3004,8.6926-3.405,17.792-0.8019"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M54.5651,36 c6.1592,4.7995,9.4596,9.5293,8.0766,12.4346c-1.5688,3.3004-8.6926,3.405-17.8035,0.8019 c-2.638-0.7554-5.4504-1.7432-8.344-2.9518c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896 c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M44.0918,53c-1.6996,7.2511-4.4743,11.9598-7.6092,11.9598c-3.6489,0-6.8098-6.38-8.3555-15.7233l-0.4842-2.3455"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M28.9271,18.7895c1.7085-7.1316,4.4512-11.7492,7.5555-11.7492c3.6492,0,6.7985,6.38,8.3556,15.7233"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M28.1271,22.7636 c2.6496,0.7554,5.4619,1.7432,8.3671,2.9518"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M44.8382,49.2364 c-2.638-0.7554-5.4504-1.7432-8.344-2.9518c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896 c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.8683,34.3501c0.0105,0.5455,0.0159,1.0955,0.0159,1.6499c0,1.9989-0.0698,3.9512-0.1976,5.8338 c-0.0533,0.8571-0.1204,1.7004-0.2004,2.528"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M23.7183,50.3166c-6.9369,1.3942-12.078,0.8539-13.3832-1.882c-1.1056-2.3228,0.7824-5.8117,4.7314-9.5702"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M27.1335,41.7408 C23.8451,39.8939,20.8971,37.947,18.4119,36"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M27.2788,41.8222 c-0.0485-0.0271-0.097-0.0543-0.1453-0.0814"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M44.8382,22.7636c0.1379,0.803,0.263,1.63,0.3744,2.4777"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M49.1309,21.7063c6.9986-1.4263,12.1984-0.9018,13.5108,1.8591c1.0638,2.2348-0.6435,5.5491-4.2915,9.1443"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M54.5651,36c-2.5217-1.964-5.52-3.9396-8.8785-5.8222"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M45.6866,30.1778 c3.3585,1.8826,6.3568,3.8582,8.8785,5.8222"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M41.666,43.947c-0.2817,0.1403-0.5677,0.2787-0.8578,0.4148"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M36.4942,25.7154 c1.325,0.5578,2.6729,1.1505,4.0325,1.8013c1.8013,0.8483,3.5212,1.7432,5.1598,2.6612"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M27.0903,36.7225c-0.0061-0.5548-0.0092-1.1129-0.0092-1.6746c0-2.6514,0.0697-5.2563,0.1976-7.7526"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M36.4942,46.2846 c-1.3363-0.5462-2.6844-1.1388-4.0441-1.7896c-1.8013-0.8599-3.5329-1.7548-5.1713-2.6728"
            />
            <circle
              cx="36.8262"
              cy="36.3268"
              r="3.2625"
              fill="none"
              stroke="#000000"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M31.61,48.3635c0,0,0.3376-0.0601,0.9707-0.3281"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M49.7017,39.9667c0,0,1.4042-0.8972,1.6463-1.1023"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M31.7066,27.2953c-0.2829,0.143-0.5659,0.2907-0.8485,0.4432"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M22.2214,32.7675c0,0,0.2273-0.2384,0.8141-0.5891"
            />
            <path
              fill="none"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M39.7525,23.2019c0,0,1.6145-0.5904,1.9449-0.6609"
            />
          </g>
        </svg>
      </div>
    </Link>
  );
}

export default Logo;
