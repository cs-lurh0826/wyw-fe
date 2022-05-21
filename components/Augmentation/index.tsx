import { Tag, AutoComplete, Button, Select } from 'antd'
import { useEffect, useState } from 'react'
import { DEFUALT_MAP, METHODS, IMethod } from './constant'
import { useMutation } from 'react-query'
import axios from 'axios'

const { Option } = Select

interface IAugmentationReq {
  text: string;
  method: IMethod;
}

const Augmentation: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [method, setMethod] = useState<IMethod>(METHODS[0]);
  const [result, setResult] = useState<string>('');

  // Mutations
  // @TODO: 修改接口
  const mutation = useMutation(
    (params: IAugmentationReq) => 
      axios
        .post('http://localhost:8080/augment', params)
        .then(res => {
          if (res.data.data) {
            setResult(res.data?.data?.augmented ?? 'Failed to Augment');
          } else {
            throw new Error('Failed to Load Response')
          }
        })
        .catch(err => {
          console.error(err)
          setResult('Failed to Augment');
        })
  )

  useEffect(() => {
    setResult('');
  }, [search, method])

  return (
    <div>
      <Tag color="#108ee9">数据增强 - Augmentation</Tag>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <AutoComplete
          disabled={mutation.isLoading}
          style={{ width: '80%' }}
          value={search}
          options={DEFUALT_MAP.map(sentence => ({
            value: sentence
          }))}
          onSelect={setSearch}
          onSearch={setSearch}
          filterOption
          allowClear
          placeholder="输入用于数据增强的语句"
        />
        <Select
          value={method}
          disabled={mutation.isLoading}
          style={{ width: '120px', marginLeft: '20px' }}
          onChange={setMethod}
        >
          {METHODS.map(method => <Option value={method} key={method}>{method}</Option>)}
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: '18px'}}
          disabled={!search || mutation.isLoading}
          loading={mutation.isLoading}
          onClick={() => mutation.mutateAsync({ text: search, method })}
        >
          确认
        </Button>
      </div>
      {
        result && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <Tag style={{ marginRight: '0'}} color='geekblue'>{result}</Tag>
          </div>
        )
      }
    </div>
  )
}

export default Augmentation