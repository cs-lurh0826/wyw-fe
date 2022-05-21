import { Tag, AutoComplete, Button } from 'antd'
import { useEffect, useState } from 'react'
import { DEFUALT_MAP } from './constant'
import { useMutation } from 'react-query'
import axios from 'axios'

interface ISelectionReq {
  text: string;
}

const Selection: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [result, setResult] = useState<string>('');

  // Mutations
  // @TODO: 修改接口
  const mutation = useMutation(
    (params: ISelectionReq) => 
      axios
        .post('http://localhost:8080/select', params)
        .then(res => {
          if (res.data.data) {
            setResult(res.data?.data?.predict ?? 'Failed to Select');
          } else {
            throw new Error('Failed to Load Response')
          }
        })
        .catch(err => {
          console.error(err)
          setResult('Failed to Select');
        })
  )

  useEffect(() => {
    setResult('');
  }, [search])

  return (
    <div>
      <Tag color="#108ee9">特征选择 - Selection</Tag>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <AutoComplete
          disabled={mutation.isLoading}
          style={{ width: '80%' }}
          value={search}
          options={Object.keys(DEFUALT_MAP).map(key => ({
            value: key
          }))}
          onSelect={setSearch}
          onSearch={setSearch}
          filterOption
          allowClear
          placeholder="请输入用于特征选择的语句"
        />
        <Button
          type="primary"
          style={{ marginLeft: '18px'}}
          disabled={!search || mutation.isLoading}
          loading={mutation.isLoading}
          onClick={() => mutation.mutateAsync({ text: search })}
        >
          确认
        </Button>
      </div>
      {
        DEFUALT_MAP[search] && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <Tag style={{ marginRight: '0'}} color='blue'>预期：{DEFUALT_MAP[search]}</Tag>
          </div>
        )
      }
      {
        result && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <Tag style={{ marginRight: '0'}} color='geekblue'>实际：{result}</Tag>
          </div>
        )
      }
    </div>
  )
}

export default Selection