export interface CreateCommuInitialType {
  name: string;
  communityImage?: any;
  introduction: string;
}

// 하나의 값에 url, blob 타입을 받는것 보다 해당 타입을 받을 수 있는 키를 각각 하나씩 쓰는게 낫지 않을까요? 값 사용에 혼란이 초래될 수 있을 것 같습니다.
