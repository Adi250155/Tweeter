import User from "../models/user.model.js"
import Notification from "../models/notification.model.js"

import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";

export const getUserProfile=async (req,res)=>{
        const username=req.params;

    try{
        const user= await User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        return res.status(200).json(user);
        
    }catch(error){
             console.log("Error in getUserProfile: ", error.message);
		res.status(500).json({ error: error.message });
    }
}

export const followUnfollowUser=async (req,res)=>{
    try{
        
         const {id}=req.params;
         const userToModify=await User.findById(id);
         const currentUser =await User.findById(req.user._id);
        

         //cant unfollow or follow own 
         if(id===req.user._id.toString()){
            return res.status(400).json({ error: "You can't follow/unfollow yourself" });
         }


         //check both usertomodify and currentuser
         if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

         const isFollowing = currentUser.following.includes(id);

         if(isFollowing){
            //unfollow
            await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}});
            await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}});

            res.status(200).json(
                   {
                     message: "User unfollowed successfully" 
                    }
                );
         }else{
            //follow
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

            //send the notification to the user
            const notification =new Notification({
                type:"follow",
                from:req.user._id,
                to:userToModify._id,
            })
            
            await notification.save();

            res.status(200).json({
                message:"User Followed Successfully!"
            });

         }
    }catch(error){
console.log("Error in followUnfollowUser: ", error.message);
		res.status(500).json({ 
            error: error.message 
        });
    }
}

export const getSuggestedUser=async (req,res)=>{
    try{
        const userId=req.user._id;
        const userFollowedByCurrentUser=await User.findById(userId).select("following");
        const user=await User.aggregate([
                      
            {
                $match:{
                    _id:{$ne:userId},
                },
            },
            {$sample:{size:10}},
            {
        $project: {
            password: 0,
            refreshToken: 0
        }
    }

        ]);

        const filteredUsers= user.filter((user)=> !userFollowedByCurrentUser.following.includes(user._id));
        const suggestedUser=filteredUsers.slice(0,4);

        /*
        to protect password :suggestedUser.forEach((user)=>(user.password=null));
         but better approach is to set it null password and refresh token on the way when we are setting up user by adding 
         {
        $project: {
            password: 0,
            refreshToken: 0
        }
    } 
        */
 
      res.status(200).json(suggestedUsers);

}catch(error){
	console.log("Error in getSuggestedUsers: ", error.message);
		res.status(500).json({ error: error.message });
    }
}


export const updateUser=async (req,res)=>{
    const {fullName,email,username,currentPassword,newPassword,bio,link}=req.body;
        let {profileImg,coverImg}=req.body;

        const userId=req.user._id;
   
    try{
         
        let user=await User.findById(userId);
        if(!user){
            return res.status(404),json({
                message:"User not found!"
            });
        }

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

        if(currentPassword && newPassword){
            const ispasswordCorrect=await bcrypt.compare(currentPassword,user.password);
            if(!ispasswordCorrect){
                return res.status(400).json({
                    error:"Current password is Incorrect!"
                });
            }
            if(newPassword<6){
                return res.status(400).json({ error: "Password must be at least 6 characters long" });
            }

            const salt=await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(newPassword,salt);

        }


        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
            }
            const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;

        }
             
        if(coverImg){
			if (user.coverImg) {
				await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(coverImg);
			coverImg = uploadedResponse.secure_url;
		}

        user.fullName = fullName || user.fullName;
		user.email = email || user.email;
		user.username = username || user.username;
		user.bio = bio || user.bio;
		user.link = link || user.link;
		user.profileImg = profileImg || user.profileImg;
		user.coverImg = coverImg || user.coverImg;

        user =await user.save();

        user.password=null; //password shouldn't be shared in response 
        return res.status(200).json(user);

    }catch(error){
console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
    }
}

