type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const baseURL = '/api';  // 使用相对路径，通过代理请求目标服务器

interface HttpRequestProps {
  method: HttpMethod;
  url: string;
  body?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const makeHttpRequest = async ({
  method,
  url,
  body,
  onSuccess,
  onError,
}: HttpRequestProps) => {
  try {
    console.log("Making request to URL:", url);
    const response = await fetch(baseURL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer oxLNl1S4sXTD1BUnC22dyjaaVo7fn9bc',
      },
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    onSuccess && onSuccess(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    onError && onError(error);
  }
};

export const fetchData = ({
  url,
  onSuccess,
  onError,
}: Omit<HttpRequestProps, 'method'>) => {
  makeHttpRequest({ method: 'GET', url, onSuccess, onError });
};

//fetchPostsList
export const getDirectionList = ({
  onSuccess,
  onError,
}: Omit<HttpRequestProps, 'method' | 'url' | 'body'>) => {
  const url = '/api/directions';
  makeHttpRequest({ method: 'GET', url, onSuccess, onError });
};

  // http://43.139.104.248:8055/items/posts
  export const  fetchPostContent = ({
    id,
    onSuccess,
    onError,
  }: {
    id: string;
    onSuccess: (data: any) => void;
    onError: (error: any) => void;
  }) => {
    console.log("url 中 id", id);
    const url = `/api/post/${id}`;
    makeHttpRequest({ method: 'GET', url, onSuccess, onError });
  };

  export const getPostsList = ({
    id,
    onSuccess,
    onError,
  }: Omit<HttpRequestProps, 'method' | 'url' | 'body'> & { id: number }) => {
    const url = `/api/posts?direction=${id}`;
    makeHttpRequest({ method: 'GET', url, onSuccess, onError });
  };
  

export const putData = ({
  url,
  body,
  onSuccess,
  onError,
}: Omit<HttpRequestProps, 'method'> & { body: any }) => {
  makeHttpRequest({ method: 'PUT', url, body, onSuccess, onError });
};

export const deleteData = ({
  url,
  onSuccess,
  onError,
}: Omit<HttpRequestProps, 'method'>) => {
  makeHttpRequest({ method: 'DELETE', url, onSuccess, onError });
};
