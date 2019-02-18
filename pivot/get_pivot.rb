def get_pivot(arr)
	pivot_not_found = -1

	# assumes that pivot must have valid numbes on both the left and right
	return pivot_not_found if arr.length < 3

	trailing_left_sum = []

	arr.each_with_index do |num, idx|
		if idx == 0
			trailing_left_sum << num
		else 
			trailing_left_sum << num + trailing_left_sum[idx - 1]
		end
	end
	
	pivot_idx = pivot_not_found
	arr.each_with_index do |num, idx|
		# assumes that pivot must have valid numbes on both the left and right
		next if idx == 0 || idx == arr.length - 1

		left_sum = trailing_left_sum[idx] - num
		if idx == 0 
			right_sum = trailing_left_sum[-1]
		else
			right_sum = trailing_left_sum[-1] - trailing_left_sum[idx]
		end

		if left_sum == right_sum && pivot_idx == -1
			pivot_idx = idx 
		end
	end

	return pivot_idx
end

puts get_pivot([1, -1, 1, 0])