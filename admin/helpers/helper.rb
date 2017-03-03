module Polog
  class Admin
    module Helper
      # 由于绝大部分 json parser 不支持 sinatra, 而 rabl 存在block丢失实例变量问题,
      # 因此暂时使用一下两个函数转换，之后再用 tile 重新实现
      def jj_collection(records, attrs = [])
        struct = Struct.new(:data, :current_page, :is_first_page, :is_last_page)
        result = records.map do |r|
          attrs.each_with_object({}) do |attr, hash|
            if attr.is_a? Proc
              hash.merge! r.instance_exec(r, &attr)
            else
              hash[attr] = r.send(attr)
            end
          end
        end
        struct.new(result, records.current_page, records.first_page?, records.last_page?).to_json
      end

      def jj_object(record, attrs = [])
        attrs.each_with_object({}) do |attr, hash|
          if attr.is_a? Proc
            hash.merge! record.instance_exec(record, &attr)
          else
            hash[attr] = record.send(attr)
          end
        end.to_json
      end
    end

    helpers Helper
  end
end
