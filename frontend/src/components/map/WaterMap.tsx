/* global kakao */
import SeoulWater from '../../assets/mockdata/SeoulWater_all.json';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MarkerList from './MarkerList';
declare global {
  interface Window {
    kakao: any;
  }
}

export interface MarkerProps {
  content: string;
  latlng: {
    La: number;
    Ma: number;
  };
}

const { kakao } = window;

function WalkMap() {
  // let markerList: MarkerProps[] = [];
  const [markerList, setMarkerList] = useState<MarkerProps[]>([]);

  useEffect(() => {
    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.54922, 126.91402), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    let positions: any = [];

    SeoulWater.DATA.map((value) => {
      positions.push({
        content: value.cot_conts_name,
        latlng: new kakao.maps.LatLng(+value.lat, +value.lng),
      });
    });

    kakao.maps.event.addListener(
      map,
      'center_changed',
      makeCenterChangedListner(map, positions),
    );

    for (var i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        clickable: true,
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div>${positions[i].content}</div>`, // 인포윈도우에 표시할 내용
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'mouseover',
        makeOverListener(map, marker, infowindow),
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow),
      );
      kakao.maps.event.addListener(marker, 'click', makeClickListener(marker));
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(
      map: any,
      marker: any,
      infowindow: { open: (arg0: any, arg1: any) => void },
    ) {
      return function () {
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow: { close: () => void }) {
      return function () {
        infowindow.close();
      };
    }

    // 인포윈도우 클릭 클로저를 만드는 함수입니다
    function makeClickListener(marker: any) {
      return function () {
        // 클릭 시 마커 좌표정보 저장
        var pos = marker.getPosition();
        // 지도 중심좌표 이동
        map.panTo(pos);
      };
    }
    function makeCenterChangedListner(map: any, positions: any) {
      return function () {
        if (map.getLevel() <= 6) {
          //마커 조회 및 표출
          var neLat = map.getBounds().getNorthEast().getLat();
          var neLng = map.getBounds().getNorthEast().getLng();
          var swLat = map.getBounds().getSouthWest().getLat();
          var swLng = map.getBounds().getSouthWest().getLng();
          setMarkerList(
            positions.filter(
              (value: any) =>
                swLng < value.latlng.La &&
                value.latlng.La < neLng &&
                swLat < value.latlng.Ma &&
                value.latlng.Ma < neLat,
            ),
          );
        } else {
          //마커 제거
        }
      };
    }
  }, []);

  return (
    <Div>
      <Map id="map" />
      <MarkerList list={markerList} />
    </Div>
  );
}
export default WalkMap;

const Div = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const Map = styled.div`
  width: 700px;
  height: 700px;
  border: 2px solid rgba(100, 100, 100, 0.5);
`;
